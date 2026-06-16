import { NextResponse } from "next/server";
import { orders } from "@/data/orders";
import fs from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "data", "live-orders.json");

function getLiveOrders() {
  try {
    if (fs.existsSync(dataFile)) {
      const data = fs.readFileSync(dataFile, "utf-8");
      return JSON.parse(data);
    }
  } catch {}
  // Р вЂ™Р С•Р В·Р Р†РЎР‚Р В°РЎвЂ°Р В°Р ВµР С РЎвЂљР ВµРЎРѓРЎвЂљР С•Р Р†РЎвЂ№Р Вµ + Р С—РЎС“РЎРѓРЎвЂљР С•Р в„– Р СР В°РЎРѓРЎРѓР С‘Р Р† Р Т‘Р В»РЎРЏ Р Р…Р С•Р Р†РЎвЂ№РЎвЂ¦
  return [];
}

function saveLiveOrders(orders) {
  fs.writeFileSync(dataFile, JSON.stringify(orders, null, 2), "utf-8");
}

// GET /api/orders РІР‚вЂќ Р С—Р С•Р В»РЎС“РЎвЂЎР С‘РЎвЂљРЎРЉ Р Р†РЎРѓР Вµ Р В·Р В°Р С”Р В°Р В·РЎвЂ№
export async function GET() {
  const live = getLiveOrders();
  // Р С›Р В±РЎР‰Р ВµР Т‘Р С‘Р Р…РЎРЏР ВµР С РЎвЂљР ВµРЎРѓРЎвЂљР С•Р Р†РЎвЂ№Р Вµ + Р В¶Р С‘Р Р†РЎвЂ№Р Вµ
  const all = [...orders, ...live.map((o, i) => ({ ...o, id: 2000 + i, fromForm: true }))];
  return NextResponse.json(all);
}

// POST /api/orders РІР‚вЂќ РЎРѓР С•Р В·Р Т‘Р В°РЎвЂљРЎРЉ Р Р…Р С•Р Р†РЎвЂ№Р в„– Р В·Р В°Р С”Р В°Р В·
export async function POST(request) {
  try {
    const body = await request.json();
    const live = getLiveOrders();
    const newOrder = {
      ...body,
      createdAt: new Date().toISOString(),
    };
    live.push(newOrder);
    saveLiveOrders(live);
    return NextResponse.json({ ok: true, order: newOrder });
  } catch (err) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 400 });
  }
}