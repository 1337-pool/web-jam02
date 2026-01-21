import { prisma } from "@/app/actions/cleint";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	// try {
	// 	const message = await prisma.message.findMany({
	// 		where: {
	// 			login: login
	// 		}
	// 	})
	// return NextResponse.json({message: ""})
	// } catch (err) {
	// 	console.error("Error on get message: ", err)
	// }
}

export async function postMessage(role, content, sessionId, login) {
	try {
		const message = await prisma.message.create({
			data: {
				login,
				content,
				sessionId,
				role
			}
		})
		return message;
	} catch (err){
		console.error("Error on post message: ", err)
	}
}
