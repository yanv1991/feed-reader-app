import reducer from './reducers'
import * as actions from './actions'

describe('feeds reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
        feeds: [],
        fetched: false,
        skip: 0
      })
  })

  it('should handle ADD_FEEDS_SUCESS', () => {
    expect(
      reducer({
        feeds: [],
        fetched: false,
        skip: 0,
      }, {
        type: actions.RECEIVE_FEEDS,
        payload: []
      })
    ).toEqual({ skip: 0, feeds: [], fetched: true, hasMoreItems: false })

    expect(
      reducer({ feeds: [], fetched: true, hasMoreItems: false  },
        {
          type: actions.ADD_FEEDS_SUCESS,
          payload: { data: 'test' }
        }
      )
    ).toEqual({ feeds: [{ data: 'test' }], fetched: true, hasMoreItems: false, showSuccess: true  })
  })
})