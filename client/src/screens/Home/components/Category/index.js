// Extneral Dependencies;
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

// Our Dependencies
import styles from './index.scss';
import { fetchCategories } from './model/actions';

// Redux
const mapStateToProps = ({ screen, router }) => {
  const { category } = screen.home;
  return {
    categories: category.categories,
    isFetching: category.isFetching,
    pathname: router.location.pathname,
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

    return (
      <div className="category-container">
        <h3>Categories</h3>
        <nav>
          <ul>
            {!isFetching && (
              categories.map(({ path, name }) => 
                <li key={name}>
                  <NavLink exact to={path} activeClassName="selected">
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
  mapDispatchToProps
)(Category);