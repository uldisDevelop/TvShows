import React, { Component } from 'react';
import styles from './Button.module.scss'
import PropTypes from 'prop-types'

export default class Button extends Component {

    static propTypes = {
        onClick: PropTypes.func,
        children: PropTypes.node
    }

    static defaultProps = {
        onClick: () => { },
        children: ''
    }

    render() {
        var { children, onClick } = this.props;

        return (
            <button
                onClick={onClick}
                data-test='buttonComponent'
                className={styles.button}>
                {children}
            </button>
        )
    }
}