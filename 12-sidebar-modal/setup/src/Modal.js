import React from "react";
import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "./context";

const Modal = () => {
    let { state, setState } = useGlobalContext();
    return (
        <div
            className={`modal-overlay ${
                state.isModalVisible ? "show-modal" : ""
            }`}
        >
            <div className="modal-container">
                <h3>Modal Content</h3>
                <button
                    className="close-modal-btn"
                    onClick={() =>
                        setState({ ...state, isModalVisible: false })
                    }
                >
                    <FaTimes />
                </button>
            </div>
        </div>
    );
};

export default Modal;
