import React, { Component } from 'react';
import styles from './InputText.module.scss'
import PropTypes from 'prop-types'
import Loader from '../loader/Loader'
import { getKeyboardKeyName } from '../../utils'

export default class InputText extends Component {

    static propTypes = {
        onChange: PropTypes.func,
        onTypingStop: PropTypes.func,        
        value: PropTypes.string,
        throttle: PropTypes.number,
        loading: PropTypes.bool,
        width: PropTypes.string,
        placeholder: PropTypes.string,
        onKeyDown: PropTypes.func,
    }

    static defaultProps = {
        onChange: () => { },        
        value: '',
        placeholder: '',
        throttle: 200,
        width: '400px',
        onKeyDown: () => { },
    }

    componentWillUnmount() {
        this.clearTypingTimer();
    }

    typingTimer = null

    clearTypingTimer() {
        clearTimeout(this.typingTimer);
    }

    setTypingTimer(newValue) {
        const { onTypingStop, throttle } = this.props;
        this.clearTypingTimer();
        this.typingTimer = setTimeout(() => {
            onTypingStop(newValue);
        }, throttle);
    }

    onChange(e) {
        const { onChange, onTypingStop } = this.props;
        const newValue = e.target.value;

        if (onChange) {
            onChange(newValue);
        }

        if (onTypingStop) {
            this.setTypingTimer(newValue);
        }
    }
    
    onKeyDown(e) {
        const { onKeyDown, onEnter } = this.props;
        if (onKeyDown) {
            onKeyDown(e, getKeyboardKeyName(e.which))
        }
        if (e.which === 13 && onEnter) {
            onEnter(e);
        }

    }

    render() {
        var { value, loading, width, placeholder } = this.props;

        return (
            <div className={styles.container} style={{ width: width }}>
                <input 
                    onChange={(e) => { this.onChange(e) }}
                    className={styles.inputText}
                    value={value}
                    autoFocus={true}
                    onKeyDown={this.onKeyDown.bind(this)}
                    placeholder={placeholder}
                />

                {loading &&
                    <div className={styles.loaderContainer}>
                        <Loader />
                    </div>
                }
            </div>
        )
    }
}