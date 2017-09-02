// Extneral Dependencies;
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

// Our Dependencies
import styles from './index.scss';
import { fetchCategories } from './model/actions';

// Redux
const mapStateToProps = ({ screen }) => {
  const { category } = screen.home;
  return {
    categories: category.categories,
    isFetching: category.isFetching,
  }
};

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(fetchCategories()),
});

class Category extends Component {
  componentWillMount() {
    this.props.fetchCategories();
  }

  render() {
    const { 
      categories, 
      isFetching,
      selected,
     } = this.props;

    const currentPath = location.pathname.toLowerCase();
    return (
      <div className="category-container">
        <h3>Categories</h3>
        <nav>
          <ul>
            {!isFetching && (
              categories.map(({ path, name }) => 
                <li key={name}>
                  <NavLink 
                    exact to={path} 
                    activeClassName="selected"
                    onClick={() => this.forceUpdate()}
                  >
                    {name}
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    )
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined, { 
    // View does not update on route change 
    // due to connect() "issue"
    // See more: https://github.com/reactjs/react-redux/blob/master/docs/troubleshooting.md
    pure: false 
  }
)(Category);