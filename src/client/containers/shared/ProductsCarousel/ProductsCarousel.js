import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import ProductsBlockHeader from '../ProductsBlockHeader'
import ProductCard from '../ProductCard'
import SlickWithPreventSwipeClick from '../../../components/SlickWithPreventSwipeClick'
import './ProductsCarousel.scss'

const slickSettings = {
  'grid-4': {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  },
  'grid-4-sm': {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 474,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  },
  'grid-5': {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1429,
        settings: {
          slidesToShow: 5
        }
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  },
  horizontal: {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }
}

class ProductsCarousel extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    layout: PropTypes.oneOf(['grid-4', 'grid-4-sm', 'grid-5', 'horizontal']),
    rows: PropTypes.number,
    products: PropTypes.array,
    group: PropTypes.string,
    allProducts: PropTypes.bool,
    withSidebar: PropTypes.bool,
    loading: PropTypes.bool,
    onGroupClick: PropTypes.func
  }

  static defaultProps = {
    layout: 'grid-4',
    rows: 1,
    products: [],
    allProducts: false,
    withSidebar: false,
    loading: false
  }

  setSlickRef = (ref) => {
    this.slickRef = ref
  };

  productsColumns () {
    const columns = []
    const { rows } = this.props
    let { products } = this.props

    if (rows > 0) {
      products = products.slice()

      while (products.length > 0) {
        columns.push(products.splice(0, rows))
      }
    }

    return columns
  }

  get columns () {
    return this.productsColumns().map((column, index) => {
      const products = column.map((product) => (
        <div key={product.id} className='block-products-carousel__cell'>
          <ProductCard product={product} />
        </div>
      ))

      return (
        <div key={index} className='block-products-carousel__column'>
          {products}
        </div>
      )
    })
  }

  render () {
    const { products, layout, title, withSidebar, group, loading } = this.props

    const blockClasses = classNames('block block-products-carousel', {
      'block-products-carousel--loading': loading
    })
    const containerClasses = classNames({
      'container-fluid': !withSidebar
    })

    return products ? (
      <div className={blockClasses} data-layout={layout}>
        <div className={containerClasses}>
          <ProductsBlockHeader
            title={title}
            group={group}
          />

          <div className='block-products-carousel__slider'>
            <div className='block-products-carousel__preloader' />

            <SlickWithPreventSwipeClick
              ref={this.setSlickRef}
              {...slickSettings[layout]}
            >
              {this.columns}
            </SlickWithPreventSwipeClick>
          </div>
        </div>
      </div>
    ) : null
  }
}

export default injectIntl(ProductsCarousel)
