import prisma from "@/libs/prismadb";
import moment from "moment";

export async function getGraphData() {
  try {
    const startDate = moment().subtract(6, "days").startOf("day");
    const endDate = moment().endOf("day");

    const result = await prisma.order.groupBy({
      by: ["createDate"],
      where: {
        createDate: {
          gte: startDate.toISOString(),
          lte: endDate.toISOString(),
        },
        status: "complete",
      },
      _sum: {
        amount: true,
      },
    });

    const aggregateData: Record<
      string,
      { day: string; date: string; totalAmount: number }
    > = {};

    const currentDate = startDate.clone();

    while (currentDate <= endDate) {
      const day = currentDate.format("dddd");

      aggregateData[day] = {
        day,
        date: currentDate.format("YYYY-MM-DD"),
        totalAmount: 0,
      };

      currentDate.add(1, "day");
    }

    result.forEach((entry) => {
      const day = moment(entry.createDate).format("dddd");
      const amount = entry._sum.amount || 0;
      aggregateData[day].totalAmount += amount;
    });

    const formattedData = Object.values(aggregateData).sort((a, b) => {
      return moment(a.date).diff(b.date);
    });

    return formattedData;
  } catch (e: any) {
    throw new Error(e);
  }
}
