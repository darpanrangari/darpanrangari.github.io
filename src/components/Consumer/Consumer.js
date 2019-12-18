import React from 'react';
import styles from './styles.css';
import {formatAsCurrency} from '../../utils/utils';

const Consumer = ({data, openModal}) => {
    const row = data.map((consumer) => (
        <tr onClick={() => openModal(consumer)} key={consumer.id}>
            <th scope="row">{consumer.id}</th>
            <td>{consumer.name}</td>
            <td>{formatAsCurrency(consumer.budget)}</td>
            <td>{formatAsCurrency(consumer.budget_spent)}</td>
            <td>{consumer.date_of_first_purchase}</td>
            <td>{consumer.total_budget && formatAsCurrency(consumer.total_budget)}</td>
        </tr>
    ));
    return (
        <div>
            <table style={styles.table} className="table">
                <thead style={styles.thead}>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Budget</th>
                    <th scope="col">Budget Spent</th>
                    <th scope="col">Date of first purchase</th>
                    <th scope="col">Total Budget</th>
                </tr>
                </thead>
                <tbody>
                {row}
                </tbody>
            </table>
        </div>
    )
};

export default Consumer

