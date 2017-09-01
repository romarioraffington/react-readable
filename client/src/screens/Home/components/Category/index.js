// Extneral Dependencies;
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

// Our Dependencies
import styles from './index.scss';
import { fetchCategories, updateCategory } from './model/actions';

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
  updateCategory: (path) => dispatch(updateCategory(path)),
});

class Category extends Component {
  componentWillMount() {
    this.props.fetchCategories();
  }
  
  updateClass(path) {
    this.props.updateCategory(path);
    this.forceUpdate();
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
        <ul>
          {!isFetching && (
            categories.map(({ path, name }) => 
              <li key={path} onClick={() => this.updateClass(path)} className={classNames('category', {
                'selected': path === location.pathname.toLowerCase()
              })}>
                <Link to={path}>{name}</Link>
              </li>
            )
          )}
        </ul>
      </div>
    )
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);