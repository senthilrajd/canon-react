import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ITEM_TYPE = {
  'category': <span className='rs-dropdown-category' />,
  'divider': <div className='rs-divider' />,
  'link': <a className='rs-dropdown-link' />,
  'text': <span className='rs-dropdown-text' />
};

class DropdownItem extends React.Component {
  constructor(props) {
    super(props);

    this._handleClick = this._handleClick.bind(this);
  }

  render() {
    const liProps = Object.assign({}, this.props);
    delete liProps.hideCallback;
    delete liProps.innerProps;
    delete liProps.enabled;

    const itemClasses = classNames(
      'rs-dropdown-item',
      this.props.className,
      { 'disabled': !this.props.enabled }
    );

    const innerElement = React.cloneElement(
      ITEM_TYPE[this.props.type],
      { children: this.props.children, ...this.props.innerProps }
    );

    return (
      <li { ...liProps } className={ itemClasses } onClick={ this._handleClick }>
        { innerElement }
      </li>
    );
  }

  _handleClick(e) {
    if (this.props.enabled) {
      this.props.onClick(e);
      this.props.hideCallback();
      return e;
    }
    e.preventDefault();
  }
}

DropdownItem.defaultProps = {
  enabled: true,
  hideCallback: () => {},
  innerProps: {},
  onClick: () => {},
  type: 'link'
};

DropdownItem.propTypes = {
  enabled: PropTypes.bool,
  hideCallback: PropTypes.func,
  innerProps: PropTypes.object,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(Object.keys(ITEM_TYPE))
};

export default DropdownItem;
