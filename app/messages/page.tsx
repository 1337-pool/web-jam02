import { getMessages } from "../actions/Messages.actions"

const messages = async () => {
	console.log(await getMessages('aeddiba'))
  return (
    <div></div>
  )
}

export default messages
