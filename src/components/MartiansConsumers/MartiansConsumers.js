import React from 'react';
import {connect} from 'react-redux';
import Consumer from '../Consumer/Consumer'
import {fetchConsumerData, setCurrentConsumer, updateConsumer} from '../../actions/index'
import Modal from '../Modal/Modal';

import './styles.css'

class MartiansConsumers extends React.Component {

    constructor(props) {
        super(props);
        this.getConsumers = this.getConsumers.bind(this)
        this.state = {
            selectedConsumer: {},
            show: false,
            formData: {
                total_budget: ""
            },
            formErrors: {total_budget: ""},
            totalBudgetValid: false
        }
    }


    componentDidMount() {
        this.props.fetchConsumerData();
    }


    showModal = () => {
        this.setState({
            show: true
        })
    }

    hideModal = () => {
        this.setState({
            show: false,
            formErrors: {totalBudget: ''}
        })
    }

    openModal = (consumerData) => {
        this.props.setCurrentConsumer(consumerData)
        this.setState({
            formData: consumerData
        })
        this.showModal()
    }

    getConsumers = () => {
        let consumerComp = null;

        const {consumers} = this.props;
        console.log('getCosumer:', consumers);
        if (consumers) {
            consumerComp = (
                <Consumer
                    data={consumers}
                    openModal={this.openModal}
                />
            )

        }
        return consumerComp;
    }

    handleChange = (event) => {
        event.preventDefault()

        const {name, value} = event.target;

        this.setState({
            formData: {
                ...this.state.formData,
                [name]: value
            }
        })
        this.validateField(name, value)
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let totalBudgetValid = this.state.totalBudgetValid;

        switch (fieldName) {
            case 'total_budget':
                totalBudgetValid = value !== "";
                fieldValidationErrors.total_budget = totalBudgetValid ? ((value > this.state.formData.budget_spent) ? totalBudgetValid : 'Total budget can not be less then budget spent') : 'Please Enter a valid value.';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            totalBudgetValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: !!(this.state.total_budget)});
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.props.updateConsumer(this.state.formData);

        this.hideModal()
    }

    render() {
        const { show, formData, formValid, formErrors} = this.state;
        return (
            <div>
                <h2> Martian Consumers </h2>

                {this.getConsumers()}

                <Modal
                    isOpen={show}
                    isClose={this.hideModal}
                    submitFrom={this.handleSubmit}
                    modalHeader={formData.name}
                    formValid={formValid}
                >

                    <div className="form-element">

                        <p className='error'>{formErrors.total_budget}</p>

                        <label htmlFor="total_budget">Total Budget</label>

                        <input type="number" name="total_budget" onChange={this.handleChange}
                               value={this.state.formData.total_budget}/>

                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        consumers: state.data.consumers
    };
};
const mapDispatchToProps = {
    fetchConsumerData,
    setCurrentConsumer,
    updateConsumer
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MartiansConsumers);
