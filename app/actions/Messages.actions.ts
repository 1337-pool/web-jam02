import {prisma} from "./cleint";

export async function getMessages(login) {
	try {
		const message = await prisma.message.findMany({
			where: {
				login: login,
			}
		})
		return message
	} catch (err) {
		console.log("error in getmessages", err);
	}
}
