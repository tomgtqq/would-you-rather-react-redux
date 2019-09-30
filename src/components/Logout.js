import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Menu, Item ,Divider} from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class Logout extends Component {
  render () {
    const { loading, dispatch, author } = this.props
    return (
      <>
        {loading === false && (
          <Menu.Menu>
            <Divider horizontal></Divider>
            <Item>
            <Item.Image size="massive" src={author.avatarURL} avatar />
            <Divider horizontal></Divider>
              <Item.Content verticalAlign="middle" style={{ color:'#fff' }} >
                {author.name}
              </Item.Content>
            </Item>
            <Menu.Item
              name="Logout"
              onClick={() => {
                this.props.history.push("/");
                dispatch(setAuthedUser(null));
              }}
            />
            <Divider horizontal style={{ color:'#fff' }}>Menu</Divider>
          </Menu.Menu>
          )}
      </>
    )
  }
}

function mapStateToProps ({ authedUser, users }) {
  return {
    author: users[authedUser],
    loading: authedUser === null
  }
}

export default withRouter(connect(mapStateToProps)(Logout))