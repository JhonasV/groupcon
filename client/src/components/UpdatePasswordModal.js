import React from 'react';
import Alert from './Alert';


const UpdatePasswordModal = ({ onChange, group, loading, onSubmit, modalMessage }) =>{

    return (
        <div
        className="modal fade"
        id="updatePasswordToggle"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            
        <div className="modal-content bg-primary">
        <form onSubmit={e => onSubmit(e)}>
            <div className="modal-header">
            <h5
                className="modal-title text-white text-weight-bold">
                Update Password
            </h5>
            <button
                type="button"
                id="closeUnlockedGroupModal"
                className="close text-white"
                data-dismiss="modal"
                aria-label="Close"
                disabled={loading}>
                <span aria-hidden="true">&times;</span></button>
            </div>
           
            <div className="modal-body" style={{ backgroundColor: "#ffff" }}>
          
                <Alert message={modalMessage.message} type={modalMessage.type ?  modalMessage.type : null}/>
            <div className='form-group'>
                <input 
                    type='password' 
                    className='form-control' 
                    name='password' 
                    placeholder='Current password'
                    value={group ? group.password : ''}
                    onChange={e => onChange(e)}    
                />
            </div>
            <div className='form-group'>
                <input 
                    type='password' 
                    className='form-control' 
                    name='newPassword' 
                    placeholder='New Password'
                    value={group ? group.newPassword : ''}
                    onChange={e => onChange(e)}    
                />
            </div>
            <div className='form-group'>
                <input 
                    type='password' 
                    className='form-control' 
                    name='confirmPassword' 
                    placeholder='Confirm Password'
                    value={group ? group.confirmPassword : ''}
                    onChange={e => onChange(e)}    
                />
            </div>
            
            </div>           
            <div className="modal-footer ml-auto">
            <input
                value='Update'
                className="btn btn-success"
                disabled={loading}
                type='submit'
            />
            <button   
                className="btn btn-secondary"
                data-dismiss="modal"
                disabled={loading}
            >
                Cancel
            </button>
            </div>
            </form>
        </div>
          
        </div>
       
     
    </div>);
}

export default UpdatePasswordModal;