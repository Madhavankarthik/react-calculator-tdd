import React from 'react';
import {mount, shallow} from 'enzyme'
import Calculator from './Calculator'
import Display from '../Display/Display'
import Keypad from '../Keypad/Keypad'


describe('Calculator', () => {
    let wrapper;

    beforeEach(() => wrapper = shallow(<Calculator/>));

    it('should render correctly', () => expect(wrapper).toMatchSnapshot());

    it('should render a <div/>', () => {
        expect(wrapper.find('div').length).toEqual(1);
    });

    it('should render Display component', () => {
        expect(wrapper.containsMatchingElement(
            <Display
                displayValue={wrapper.instance().state.displayValue}/>))
            .toEqual(true);
    });

    it('should render Display and Keyboard components', () => {
        expect(wrapper.containsAllMatchingElements([
                <Display
                    displayValue={wrapper.instance().state.displayValue}/>,
                <Keypad
                    callOperator={wrapper.instance().callOperator}
                    numbers={wrapper.instance().state.numbers}
                    operators={wrapper.instance().state.operators}
                    setOperator={wrapper.instance().setOperator}
                    updateDisplay={wrapper.instance().updateDisplay}
                />
            ]
        )).toEqual(true);
    });

});

describe('Mounted Calculator', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<Calculator/>);
    });

    it('should update display when a number is clicked', () => {
        const spy = jest.spyOn(wrapper.instance(), 'updateDisplay');
        wrapper.instance().forceUpdate();
        expect(spy).toHaveBeenCalledTimes(0);
        wrapper.find('.number-key').first().simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should update display when operator is clicked', () => {
        const spy = jest.spyOn(wrapper.instance(), 'setOperator');
        wrapper.instance().forceUpdate();
        expect(spy).toHaveBeenCalledTimes(0);
        wrapper.find('.operator-key').first().simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('calls callOperator when the submit key is clicked', () => {
        const spy = jest.spyOn(wrapper.instance(), 'callOperator');
        wrapper.instance().forceUpdate();
        expect(spy).toHaveBeenCalledTimes(0);
        wrapper.find('.submit-key').simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);
    });
});

describe('Update Display', () => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<Calculator/>));

    it('should display Value ', () => {
        wrapper.instance().updateDisplay('5');
        expect(wrapper.state('displayValue')).toEqual('5');
    });

    it('should concatenate display value', () => {
        wrapper.instance().updateDisplay('5');
        wrapper.instance().updateDisplay('0');
        expect(wrapper.state('displayValue')).toEqual('50');
    });

    it('should removes the leading 0 from the display value', () => {
        wrapper.instance().updateDisplay('0');
        expect(wrapper.state('displayValue')).toEqual('0');
        wrapper.instance().updateDisplay('5');
        expect(wrapper.state('displayValue')).toEqual('5');
    });

    it('prevents multiple leading "0"s from displayValue', () => {
        wrapper.instance().updateDisplay('0');
        wrapper.instance().updateDisplay('0');
        expect(wrapper.state('displayValue')).toEqual('0');
    });

    it('should remove the last value of displayValue when ce is clicked', function () {
        wrapper.instance().updateDisplay('5');
        wrapper.instance().updateDisplay('0');
        wrapper.instance().updateDisplay('ce');
        expect(wrapper.state('displayValue')).toEqual('5');
    });

    it('prevents multiple instances of "." in displayValue', () => {
        wrapper.instance().updateDisplay('.');
        wrapper.instance().updateDisplay('.');
        expect(wrapper.state('displayValue')).toEqual('.');
    });

    it('will set displayValue to "0" if displayValue is equal to an empty string', () => {
        wrapper.instance().updateDisplay('ce');
        expect(wrapper.state('displayValue')).toEqual('0');
    });

});

describe('setOperator', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Calculator/>)
    });

    it('should update the value of selected operator', function () {
        wrapper.instance().setOperator('+');
        expect(wrapper.state('selectedOperator')).toEqual('+');
        wrapper.instance().setOperator('/');
        expect(wrapper.state('selectedOperator')).toEqual('/');
    });

    it('should update the value of the operator in storedValue', function () {
        wrapper.instance().updateDisplay('5');
        wrapper.instance().setOperator('+');
        expect(wrapper.state('storedValue')).toEqual('5');
    });

    it('should update the value of display value to 0', function () {
        wrapper.instance().updateDisplay('5');
        wrapper.instance().setOperator('+');
        expect(wrapper.state('displayValue')).toEqual('0');
    });

    it('should update selected operator is not empty string, does not update storedValue', function () {
        wrapper.setState({displayValue: '5'});
        wrapper.instance().setOperator('+');
        expect(wrapper.state('storedValue')).toEqual('5');
        wrapper.instance().setOperator('-');
        expect(wrapper.state('storedValue')).toEqual('5');
        expect(wrapper.state('selectedOperator')).toEqual('-');
    });

});

describe('callOperator', () => {
    let wrapper;

    beforeEach(() => wrapper = shallow(<Calculator/>));

    it('should update the displayValue to sum of stored value and display value for +', function () {
        wrapper.instance().updateDisplay('3');
        wrapper.instance().setOperator('+');
        wrapper.instance().updateDisplay('2');
        wrapper.instance().callOperator();
        expect(wrapper.state('displayValue')).toEqual('5');
    });

    it('should update the displayValue to difference of stored value and display value for +', function () {
        wrapper.instance().updateDisplay('3');
        wrapper.instance().setOperator('-');
        wrapper.instance().updateDisplay('2');
        wrapper.instance().callOperator();
        expect(wrapper.state('displayValue')).toEqual('1');
    });



});