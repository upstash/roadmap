export default function FormNotification({ handleNewEmail, inputEmail }) {
  return (
    <div className="card">
      <form onSubmit={handleNewEmail}>
        <input
          className="input"
          type="text"
          ref={inputEmail}
          placeholder="Enter your email to be notified on released items?"
        />
        <input className="button" type="submit" value="Save" />
      </form>
    </div>
  )
}
