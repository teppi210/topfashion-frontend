import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import setMessages from '../../../utils/setMessages'
import messages from './DropdownLanguage.messages'
import Dropdown from '../../../components/Dropdown'
import { inject, observer } from 'mobx-react'

@inject('changeLanguageStore')
@observer
class DropdownLanguage extends React.Component {
  static propTypes = {
    intl: PropTypes.object
  }

  messages = setMessages(this, messages, 'app.languages.')

  render () {
    const { intl } = this.props
    const { locale } = intl

    const languages = [
      {
        title: this.messages('en'),
        locale: 'en',
        icon: 'images/languages/language-1.png',
        icon_srcset: '/public/img/languages/language-1.png 1x, images/languages/language-1@2x.png 2x'
      },
      {
        title: this.messages('ru'),
        locale: 'ru',
        icon: 'images/languages/language-2.png',
        icon_srcset: '/public/img/languages/language-2.png 1x, images/languages/language-2@2x.png 2x'
      }
    ]

    const onChange = value => {
      const urlParts = window.location.href.split(/(\/|\?)/)
      if (urlParts && urlParts[6] === locale) {
        urlParts[6] = value
      } else {
        urlParts[6] = urlParts[6] ? `${value}/${urlParts[6]}` : value
      }

      const url = urlParts.join('')
      window.location.href = url.endsWith('/') ? url.slice(0, -1) : url
    }

    const language = languages.find((x) => x.locale === locale)

    const title = (
      <React.Fragment>
        Language
        {': '}
        <span className='topbar__item-value'>{language.locale}</span>
      </React.Fragment>
    )

    return (
      <Dropdown
        title={title}
        withIcons
        items={languages}
        onClick={(item) => onChange(item.locale)}
      />
    )
  }
}

export default injectIntl(DropdownLanguage)