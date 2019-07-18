import React, { Fragment, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from '@material-ui/core/CircularProgress';

import { fetchFeeds } from "../actions";

const INITIAL_COUNT = 6;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  card: { margin: "1rem", height: '40rem', overflowY: "auto" },
  button: {
    margin: theme.spacing(1)
  },
  truncate: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  scroll: {
    display: "flex",
    flexWrap: "wrap",
    boxSizing: "border-box",
    maxWidth: "calc(100vw - 6px)",
    [theme.breakpoints.up("md")]: {
      maxWidth: "calc(100vw - 20px)"
    },
    [theme.breakpoints.up("lg")]: {
        maxWidth: "unset"
      },
  },
  loading: { margin: '0 auto' },
}));

export const FeedList = ({ isAddingItem, isFetching, skip, fetched, feeds = [], onFetchFeeds, hasMoreItems }) => {
  const classes = useStyles() || {};
  const showLoading = isFetching && !feeds.length

  useEffect(() => {
    if(!fetched && !isFetching) {
      onFetchFeeds(0, INITIAL_COUNT); // this shouldn't be called if the request in SSR was success
    }
  }, [fetched, isFetching]);

  const fetchMore = useCallback(() => {
    onFetchFeeds(skip, 0);
  }, [skip]);

  return (
    showLoading || isAddingItem ? <Grid item xs={12}><h1 role="loading">Loading...</h1></Grid> :

    <Fragment>
      <InfiniteScroll
        dataLength={feeds.length}
        next={fetchMore}
        hasMore={hasMoreItems}
        loader={<CircularProgress disableShrink className={classes.loading} />}
        className={classes.scroll}
      >
        {feeds.map((currentItem, index) => {
          return (
            <Grid role="item" key={`${currentItem.link}${index}`} item xs={12} sm={11} md={4}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textPrimary"
                    gutterBottom
                  >
                    {currentItem.title}
                  </Typography>
                  {currentItem.items.map((newItem, index) => (
                    <Fragment key={index}>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        {newItem.title}
                      </Typography>
                      <div className={classes.truncate}>
                        <a href={newItem.link} target="_blank">{newItem.link}</a>
                      </div>
                    </Fragment>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </InfiniteScroll>
    </Fragment>
  );
};

export default connect(
  ({ isFetching, skip, feeds, fetched, hasMoreItems }) => {
    return { isFetching, skip, feeds, fetched, hasMoreItems };
  },
  { onFetchFeeds: fetchFeeds }
)(FeedList);
