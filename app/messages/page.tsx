import LoadingPage from "@/components/elements/loading-page"
import { getMessages } from "../actions/Messages.actions"

const messages = async () => {
	console.log(await getMessages('aeddiba'))
  return <LoadingPage />
}

export default messages
