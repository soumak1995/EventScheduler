import React,{useState} from 'react'
import Modal from 'react-modal';
import "./styles.css";
import styled from "styled-components";
function ModalComp() {
const [modalIsOpen,setModalIsOpen]=useState(true);
  const Wrapper = styled.div`
  align-items: center;
  background: #ccc
    repeating-linear-gradient(
      45deg,
      #606dbc,
      #606dbc 10px,
      #465298 10px,
      #465298 20px
    );
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`;
const closemodal=()=>{
    setModalIsOpen(false)
   
  }
  const openModal=()=>{
    setModalIsOpen(true)
  }
    return (
        <Wrapper>
             <Modal
          isOpen={openModal}
             onRequestClose={closemodal}
             className="Modal"
             overlayClassName="Overlay">
       
           </Modal>
        </Wrapper>
    )
}

export default ModalComp
