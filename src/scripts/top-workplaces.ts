import { PrismaService } from "../modules/prisma/prisma.service";
import { WorkplacesService } from "../modules/workplaces/workplaces.service";

(async function fetchTopWorkplaces(): Promise<{ name: string; shifts: number }[] | undefined> {
  const prismaService = new PrismaService();
  const workplacesService = new WorkplacesService(prismaService);

  try {
    const topWorkplaces = await workplacesService.getTopWorkplacesByShifts();
    console.log(topWorkplaces);
    return topWorkplaces
  } catch (error) {
    console.error("Error fetching top workplaces:", error);
  } finally {
    await prismaService.$disconnect();
  }
})();