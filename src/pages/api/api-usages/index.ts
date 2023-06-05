import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { apiUsageValidationSchema } from 'validationSchema/api-usages';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getApiUsages();
    case 'POST':
      return createApiUsage();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getApiUsages() {
    const data = await prisma.api_usage
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'api_usage'));
    return res.status(200).json(data);
  }

  async function createApiUsage() {
    await apiUsageValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.api_usage.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
