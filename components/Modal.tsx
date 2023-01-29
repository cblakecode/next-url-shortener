const Modal = (props: any) => {
  return (
    <>
      <input type="checkbox" id="delete-modal" className="modal-toggle" />
      <label
        htmlFor="delete-modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box relative">
          <h3 className="font-bold text-lg">
            Are you sure you want to delete?
          </h3>
          <div className="modal-action">
            <label
              htmlFor="delete-modal"
              className="btn btn-error"
              onClick={props.mutate}
            >
              Delete
            </label>
            <label htmlFor="delete-modal" className="btn">
              Go Back
            </label>
          </div>
        </div>
      </label>
    </>
  );
};

export default Modal;
