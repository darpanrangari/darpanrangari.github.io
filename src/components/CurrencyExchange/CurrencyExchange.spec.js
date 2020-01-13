import React from 'react';
import {shallow} from 'enzyme';
import {CurrencyExchange} from './CurrencyExchange';

describe('test modal component', () => {

    let component = '',
        instance = ''

    beforeEach(() => {

        const props = {

        }
        component = shallow(<CurrencyExchange {...props}/>);

        instance = component.instance();

    });

    it('should render', () => {
        expect(component).toMatchSnapshot();
    });

    it('should check heading', () => {
        expect(component.find('h2').text()).toEqual(' Martian Consumers ');
    });

});
