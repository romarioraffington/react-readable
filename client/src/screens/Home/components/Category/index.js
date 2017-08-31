// Extneral Dependencies;
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Our Dependencies
import styles from './index.scss';
import { fetchCategories } from './model/actions';

// Redux
const mapStateToProps = ({ screen }) => {
  const { category } = screen.home;
  return {
    categories: category.categories,
    isLoading: category.isLoading,
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
    const { categories, isLoading } = this.props;
    return (
      <div className="category-container">
        <h3>Categories</h3>
        <ul>
          <li className="category selected" key="all">All</li>
          {!isLoading && (
            categories.map(category => 
              <li key={category.path} className="category">{category.name}</li>
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