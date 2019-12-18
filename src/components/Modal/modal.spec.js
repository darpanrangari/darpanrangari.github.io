import React from 'react';
import {shallow} from 'enzyme';
import Modal from './Modal';

test('test modal component', () => {
    const component = shallow(<Modal
        isOpen={true}
        isClose={jest.fn()}
        submitFrom={jest.fn()}
    > Lorem ipsum</Modal>)

    expect(component).toMatchSnapshot();
    expect(component.find('.modal-body')).toHaveLength(1);
})
