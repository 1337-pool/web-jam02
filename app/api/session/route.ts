import { prisma } from "@/app/actions/cleint";
import {  NextResponse } from "next/server";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const login = searchParams.get("login") || "";
    const id = searchParams.get("id")
	if (id) {
		try {
			const sessions = await prisma.defenseSession.findUnique({
				where: {
					login,
					id
				}
			})
			return NextResponse.json(sessions);
		} catch (err) {
			console.error(err)
		}

	} else {
		try {
			const sessions = await prisma.defenseSession.findMany({
				where: {
					login,
				},
                  select: {
                    id: true,
                    title: true,
                    score: true
                },
			})
			return NextResponse.json(sessions);
		} catch (err) {
			console.error(err)
		}

	}
}

export async function POST(req: Request) {
	const { title, login, codeSnippet, score, questions } =  await req.json()
	try {
		const session = await prisma.defenseSession.create({
			data: {
				title,
				login,
				codeSnippet,
				score,
				questions
			}
		})
		return NextResponse.json(session)
	} catch (err) {
		console.error(err)
	}
}

export async function PATCH(req: Request) {
	const {id, score} = await req.json()
	try {
		const session = await prisma.defenseSession.update({
			where: {
				id,
			},
			data: {
				score,
			}
		})
		return NextResponse.json(session)
	} catch (err) {
		console.error(err)
	}
}
