// データベースにアクセスするためのドキュメント
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // const newLink = await prisma.link.create({
  //   data: {
  //     description: 'a',
  //     url: 'http://hoge.com'
  //   }
  // })

  const allLinks = await prisma.link.findMany()
  console.log(allLinks)
}

main().then().finally(async ()=>{
  prisma.$disconnect
})