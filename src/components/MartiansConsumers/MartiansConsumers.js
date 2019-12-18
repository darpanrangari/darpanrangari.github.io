import React from 'react';
import {connect} from 'react-redux';
import Consumer from '../Consumer/Consumer'
import {fetchConsumerData, setCurrentConsumer, updateConsumer} from '../../actions/index'
import Modal from '../Modal/Modal';
import FormErrors from '../FormError/FormErrors';

import './styles.css'

class MartiansConsumers extends React.Component {

    constructor(props) {
        super(props);
        this.getConsumers = this.getConsumers.bind(this)
        this.state = {
            selectedConsumer: {},
            show: false,
            formData: {
                name: "",
                budget: "",
                budget_spent: "",
                date_of_first_purchase: "",
                total_budget:""
            },
            formErrors: {name: '', budget: '', budget_spent: '', date_of_first_purchase: '',total_budget:''},
            nameValid: false,
            budgetValid: false,
            budgetSpentValid: false,
            dateOfFirstPurchaseValid: false,
            totalBudgetValid: false
        }
    }

    showModal = () => {
        this.setState({
            show: true
        })
    }

    hideModal = () => {
        this.setState({
            show: false,
            formErrors:{name: '', budget: '', budget_spent: '', date_of_first_purchase: '',totalBudget:''}
        })
    }

    componentDidMount() {
        this.props.fetchConsumerData();
    }

    openModal = (consumerData) => {
        this.props.setCurrentConsumer(consumerData)
        this.setState({
            //selectedConsumer: consumerData,
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
                //id:this.state.selectedConsumer.id,
                [name]: value
            }
        })
        this.validateField(name, value)
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let nameValid = this.state.nameValid;
        let budgetValid = this.state.budgetValid;
        let budgetSpentValid = this.state.budgetSpentValid;
        let dateOfFirstPurchaseValid = this.state.dateOfFirstPurchaseValid;
        let totalBudgetValid = this.state.totalBudgetValid;
        console.log('asdfadsf',this.state.formData.budget_spent)
        switch(fieldName) {
            case 'name':
                nameValid = value !== "";
                fieldValidationErrors.name = nameValid ? '' : 'This field is required.';
                break;
            case 'budget':
                budgetValid = value !== "";
                fieldValidationErrors.budget = budgetValid ? '': 'This field is required.';
                break;
            case 'budget_spent':
                budgetSpentValid = value !== "";
                fieldValidationErrors.budget_spent = budgetSpentValid ? '': 'This field is required.';
                break;
            case 'date_of_first_purchase':
                dateOfFirstPurchaseValid = value !== "";
                fieldValidationErrors.date_of_first_purchase = dateOfFirstPurchaseValid ? '': 'This field is required.';
                break;
            case 'total_budget':
                totalBudgetValid = value !== "";
                fieldValidationErrors.total_budget = totalBudgetValid ? ((value > this.state.formData.budget_spent)? totalBudgetValid :'Total budget can not be less then budget spent') : 'Please Enter a valid value.';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            nameValid,
            budgetValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.nameValid && this.state.budgetValid && this.state.budget_spent && this.state.date_of_first_purchase&& this.state.total_budget});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form data',this.state.formData)
        this.props.updateConsumer(this.state.formData)
    }

    render() {
        const {name, budget, budget_spent, date_of_first_purchase, total_budget} = this.state.formData;
        return (
            <div>
                <h2> Martian Consumers </h2>
                {this.getConsumers()}
                <Modal
                    isOpen={this.state.show}
                    isClose={this.hideModal}
                    submitFrom={this.handleSubmit}
                    modalHeader="Edit Consumer"
                    formValid={this.state.formValid}
                >
                    <div className="form-element">
                        <p className='error'>{this.state.formErrors.name}</p>
                        <label htmlFor="name">Name:</label>
                        <input type="text" name="name" onChange={this.handleChange} value={name}/>

                    </div>

                    <div className="form-element">
                        <p className='error'>{this.state.formErrors.budget}</p>
                        <label htmlFor="budget">Budget:</label>

                        <input type="number" name="budget" onChange={this.handleChange} value={budget}/>
                    </div>
                    <div className="form-element">
                        <p className='error'>{this.state.formErrors.budget_spent}</p>
                        <label htmlFor="budget_spent">Budget Spent:</label>

                        <input type="number" name="budget_spent" onChange={this.handleChange} value={budget_spent}/>
                    </div>
                    <div className="form-element">
                        <p className='error'>{this.state.formErrors.date_of_first_purchase}</p>
                        <label htmlFor="date_of_first_purchase">Date of Purchase:</label>

                        <input type="text" name="date_of_first_purchase" onChange={this.handleChange}
                               value={date_of_first_purchase}/>

                    </div>

                    <div className="form-element">
                        <p className='error'>{this.state.formErrors.total_budget}</p>
                        <label htmlFor="total_budget">Total Budget</label>

                        <input type="number" name="total_budget" onChange={this.handleChange}
                               value={total_budget}/>

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
