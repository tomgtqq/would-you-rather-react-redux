import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Menu, Item } from 'semantic-ui-react'

class Nav extends Component {
  render () {
    const { loading, dispatch, author } = this.props
    return (
      <Menu>
        <Menu.Item
          name='Dashboard'
          as={NavLink}
          exact to="/"
        >
          Dashboard
        </Menu.Item>

        <Menu.Item
          name='NewQuestion'
          as={NavLink}
          exact to="/add"
        >
          New Question
        </Menu.Item>

        <Menu.Item
          name='leaderboard'
          as={NavLink}
          exact to="/leaderboard"
        >
          Leader Board
        </Menu.Item>

        {loading === false && (
          <Menu.Menu position="right">
            <Item>
              <Item.Content verticalAlign="middle">
                Hi {author.name}
              </Item.Content>
              <Item.Image size="tiny" src={author.avatarURL} avatar />
            </Item>
            <Menu.Item
              name="Logout"
              onClick={() => {
                this.props.history.push("/");
                dispatch(setAuthedUser(null));
              }}
            />
          </Menu.Menu>
          )}
      </Menu>
    )
  }
}

function mapStateToProps ({ authedUser, users }) {
  return {
    author: users[authedUser],
    loading: authedUser === null
  }
}

export default withRouter(connect(mapStateToProps)(Nav))