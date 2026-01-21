import { getMessages } from "../actions/Messages.actions"

const messages = () => {
	console.log(await getMessages('aeddiba'))
  return (
    <div></div>
  )
}

export default messages
