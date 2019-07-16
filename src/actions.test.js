import * as actions from './actions'
import mock from './mock'

describe('actions', () => {
  it('should create an action to add a feed', () => {
    const payload = 'https://www.reddit.com/.rss'
    const expectedAction = {
      type: actions.ADD_FEEDS_SUCESS,
      payload
    }
    expect(actions.addFeed(payload)).toEqual(expectedAction)
  })

  it('should create an action to load the feeds', () => {
    const payload = mock
    const expectedAction = {
      type: actions.RECEIVE_FEEDS,
      payload
    }
    expect(actions.receiveFeeds(payload)).toEqual(expectedAction)
  })
})