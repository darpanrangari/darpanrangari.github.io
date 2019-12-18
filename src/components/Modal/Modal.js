import React from 'react';

import './styles.css'

const Modal = (props) => (
    <div>

        { props.isOpen ? <div onClick={props.isClose} className="back-drop"/> : null }

        <div className="modal-wrapper"
             style={{
                 transform: props.isOpen ? 'translateY(0vh)' : 'translateY(-100vh)',
                 opacity: props.isOpen ? '1' : '0'
             }}>
            <div className="modal-header">
                <h3>{props.modalHeader}</h3>
                <span className="close-modal-btn"  onClick={ props.isClose}>×</span>
            </div>
            <div className="modal-body">

                    {props.children}

            </div>
            <div className="modal-footer">
                <button className="btn-continue" onClick={props.submitFrom}>Submit</button>
            </div>
        </div>
    </div>
);
// class Modal extends React.Component {
//     constructor(props){
//         super(props)
//     }
//
//     render(){
//
//         if(!this.props.isOpen) {
//             return null
//         }
//
//         return (
//
//             <div>
//                 <div className="modal-wrapper"
//                      style={{
//                          transform: this.props.isOpen ? 'translateY(0vh)' : 'translateY(-100vh)',
//                          opacity: this.props.isOpen ? '1' : '0'
//                      }}>
//                     <div className="modal-header">
//                         <h3>Modal Header</h3>
//                         <span className="close-modal-btn"  onClick={ this.props.isClose}>×</span>
//                     </div>
//                     <div className="modal-body">
//                         <p>
//                             {this.props.children}
//                         </p>
//                     </div>
//                     <div className="modal-footer">
//                         <button className="btn-cancel" onClick={ this.props.isClose} >CLOSE</button>
//                         <button className="btn-continue" onClick={ this.props.isClose}>CONTINUE</button>
//                     </div>
//                 </div>
//             </div>
//
//         )
//     }
// }



export default Modal;

