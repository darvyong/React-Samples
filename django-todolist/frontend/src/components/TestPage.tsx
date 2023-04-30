import PropTypes from 'prop-types';

function CreateEvent() {
    return (
        <h1> This is our create events page</h1>
    );
}

CreateEvent.propTypes = {
  window: PropTypes.func,
};

export default CreateEvent;