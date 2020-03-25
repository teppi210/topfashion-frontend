import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import WidgetFilters from '../WidgetFilters'
import WidgetProducts from '../WidgetProducts'
import filters from '../../../data/shopFilters'
import './CategorySidebar.scss'

@inject('mobileMenuStore')
@observer
class CategorySidebar extends Component {
  close = () => {
    this.props.mobileMenuStore.closeMobileFilter()
  }

  render () {
    const classes = classNames('block block-sidebar', {
      'block-sidebar--open': this.props.mobileMenuStore.isOpenMobileFilter,
      'block-sidebar--offcanvas--always': this.props.offcanvas === 'always',
      'block-sidebar--offcanvas--mobile': this.props.offcanvas === 'mobile'
    })

    return (
      <div className={classes}>
        {/* eslint-disable-next-line max-len */}
        <div className='block-sidebar__backdrop' />
        <div className='block-sidebar__body' >
          <div className='block-sidebar__header'>
            <div className='block-sidebar__title'>Filters</div>
            <button className='block-sidebar__close' type='button' onClick={() => this.close()}>
              <i className='fas fa-times' />
            </button>
          </div>
          <div className='block-sidebar__item'>
            <WidgetFilters title='Filters' filters={filters} offcanvas={this.props.offcanvas} />
          </div>
          {this.props.offcanvas !== 'always' && (
            <div className='block-sidebar__item d-none d-lg-block'>
              <WidgetProducts title='Latest Products' />
            </div>
          )}
        </div>
      </div>
    )
  }
}

CategorySidebar.propTypes = {
  mobileMenuStore: PropTypes.any,
  offcanvas: PropTypes.oneOf(['always', 'mobile'])
}

CategorySidebar.defaultProps = {
  offcanvas: 'mobile'
}

export default CategorySidebar
