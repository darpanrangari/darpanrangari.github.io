import React from 'react';
import {shallow} from 'enzyme';
import {MartiansConsumers} from './MartiansConsumers';

describe('test modal component', () => {

    let component = '',
        instance = ''

    beforeEach(() => {

        const props = {
            fetchConsumerData: jest.fn(),
            setCurrentConsumer: jest.fn(),
            updateConsumer: jest.fn(),
            consumers: [{
                id: 2,
                name: "Solar Firma",
                budget: 1123.2200,
                budget_spent: 451.3754,
                date_of_first_purchase: "2120-01-14"
            }]
        }
        component = shallow(<MartiansConsumers {...props}/>);

        instance = component.instance();

    });

    it('should render', () => {
        expect(component).toMatchSnapshot();
    });

    it('should check heading', () => {
        expect(component.find('h2').text()).toEqual(' Martian Consumers ');
    });

    it('should show modal when called', () => {
        instance.showModal();
        expect(component.state().show).toBeTruthy();
    });

    it('should hide modal when called and reset form error and total budget', () => {
        instance.hideModal();
        expect(component.state().show).toBeFalsy();
        expect(component.state().formErrors.totalBudget).toEqual("");
        expect(component.state().formData.total_budget).toEqual("");
    });

    it('should call handleChange', () => {
        let event = {
            target: {
                name: 'budget',
                value: 12345
            },
            preventDefault: jest.fn()
        }

        spyOn(instance, 'validateField');

        instance.handleChange(event);

        expect(event.preventDefault).toHaveBeenCalled();

        expect(instance.validateField).toHaveBeenCalledWith("budget", 12345);
    });


});
