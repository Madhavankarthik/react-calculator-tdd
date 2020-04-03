import React from 'react';
import {mount, shallow} from 'enzyme';
import Keypad from './Keypad';
import Key from '../Key/Key';

describe('Keypad component', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
            <Keypad
                callOperator={jest.fn()}
                numbers={[]}
                operators={[]}
                setOperator={jest.fn()}
                updateDisplay={jest.fn()}
            />
        );
    });

    it('should render correctly', () => expect(wrapper).toMatchSnapshot());

    it('should render 4 <div/>\'s', () => {
        expect(wrapper.find('div').length).toEqual(4);
    });

    it('should render the instance of Key component', () => {
        expect(wrapper.find('Key').length).toEqual(1);
    });

    it('should render an instance of Key Component for each index of numbers, operators and submit key ', function () {
        const numbers = ['0', '1'];
        const operators = ['+', '-'];
        const submit = 1;

        const keyTotal = numbers.length + operators.length + submit;

        wrapper.setProps({numbers, operators});
        expect(wrapper.find('Key').length).toEqual(keyTotal);


    });
});

describe('Mounted Keypad ', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(
            <Keypad
                operators={[]}
                callOperator={jest.fn()}
                setOperator={jest.fn()}
                numbers={[]}
                updateDisplay={jest.fn()}
            />
        );

    });
    it('should render the values of numbers', () => {
        wrapper.setProps({numbers: ['0', '1', '2']});
        expect(wrapper.find('.numbers-container').text()).toEqual('012');
    });

    it('should renders value of the operators ', () => {
        wrapper.setProps({operators: ['+', '-', '*', '/']});
        expect(wrapper.find('.operators-container').text()).toEqual('+-*/');
    });

});