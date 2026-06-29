"use client";

import { useMemo, useState } from "react";
import { SectionHeader } from "@/components/ui/content";

function numberFormat(value: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Math.max(0, value));
}

export function CalculatorTool() {
  const [currentCash, setCurrentCash] = useState(2500);
  const [incomePerMinute, setIncomePerMinute] = useState(120);
  const [activeMinutes, setActiveMinutes] = useState(20);
  const [offlineMinutes, setOfflineMinutes] = useState(180);
  const [cashPotionMultiplier, setCashPotionMultiplier] = useState(1);
  const [robloxPlus, setRobloxPlus] = useState(false);
  const [upgradeCost, setUpgradeCost] = useState(10000);
  const [upgradeMultiplier, setUpgradeMultiplier] = useState(1.25);

  const result = useMemo(() => {
    const plusMultiplier = robloxPlus ? 1.1 : 1;
    const minutes = activeMinutes + offlineMinutes;
    const baseIncome = incomePerMinute * minutes;
    const boostedIncome = baseIncome * cashPotionMultiplier * plusMultiplier;
    const totalCash = currentCash + boostedIncome;
    const remaining = Math.max(0, upgradeCost - totalCash);
    const earningRate = Math.max(1, incomePerMinute * cashPotionMultiplier * plusMultiplier);
    const minutesToUpgrade = remaining / earningRate;
    const extraIncome = incomePerMinute * Math.max(0, upgradeMultiplier - 1);
    const paybackMinutes = extraIncome > 0 ? upgradeCost / extraIncome : Infinity;

    return {
      totalCash,
      boostedIncome,
      remaining,
      minutesToUpgrade,
      paybackMinutes
    };
  }, [activeMinutes, cashPotionMultiplier, currentCash, incomePerMinute, offlineMinutes, robloxPlus, upgradeCost, upgradeMultiplier]);

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
      <div className="content-card">
        <SectionHeader eyebrow="Estimator" title="Cash and offline earnings" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-bold text-white">Current cash</span>
            <input className="rounded-lg border border-white/10 bg-[#111113] px-3 py-3 text-white" type="number" min="0" value={currentCash} onChange={(event) => setCurrentCash(Number(event.target.value))} />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-bold text-white">Brainrot cash / min</span>
            <input className="rounded-lg border border-white/10 bg-[#111113] px-3 py-3 text-white" type="number" min="1" value={incomePerMinute} onChange={(event) => setIncomePerMinute(Number(event.target.value))} />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-bold text-white">Active minutes</span>
            <input className="rounded-lg border border-white/10 bg-[#111113] px-3 py-3 text-white" type="number" min="0" value={activeMinutes} onChange={(event) => setActiveMinutes(Number(event.target.value))} />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-bold text-white">Offline minutes</span>
            <input className="rounded-lg border border-white/10 bg-[#111113] px-3 py-3 text-white" type="number" min="0" value={offlineMinutes} onChange={(event) => setOfflineMinutes(Number(event.target.value))} />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-bold text-white">Cash boost multiplier</span>
            <input className="rounded-lg border border-white/10 bg-[#111113] px-3 py-3 text-white" type="number" min="1" step="0.1" value={cashPotionMultiplier} onChange={(event) => setCashPotionMultiplier(Number(event.target.value))} />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-bold text-white">Target upgrade cost</span>
            <input className="rounded-lg border border-white/10 bg-[#111113] px-3 py-3 text-white" type="number" min="0" value={upgradeCost} onChange={(event) => setUpgradeCost(Number(event.target.value))} />
          </label>
          <label className="grid gap-2 sm:col-span-2">
            <span className="text-sm font-bold text-white">Expected upgrade multiplier</span>
            <input className="rounded-lg border border-white/10 bg-[#111113] px-3 py-3 text-white" type="number" min="1" step="0.05" value={upgradeMultiplier} onChange={(event) => setUpgradeMultiplier(Number(event.target.value))} />
          </label>
          <button type="button" className={robloxPlus ? "button-primary sm:col-span-2" : "button-secondary sm:col-span-2"} onClick={() => setRobloxPlus((value) => !value)}>
            {robloxPlus ? "Roblox Plus +10% cash on" : "Roblox Plus +10% cash off"}
          </button>
        </div>
      </div>

      <div className="content-card">
        <SectionHeader eyebrow="Results" title="Upgrade timing" />
        <div className="mt-6 grid gap-4">
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <p className="text-sm font-bold text-white/60">Estimated cash after session</p>
            <p className="mt-2 text-4xl font-black text-white">{numberFormat(result.totalCash)}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm font-bold text-white/60">Session earnings</p>
              <p className="mt-2 text-2xl font-black text-[#20C997]">{numberFormat(result.boostedIncome)}</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm font-bold text-white/60">Cash still needed</p>
              <p className="mt-2 text-2xl font-black text-[#F5C542]">{numberFormat(result.remaining)}</p>
            </div>
          </div>
          <p className="text-lg font-extrabold text-white">
            {result.remaining === 0
              ? "You can afford the target upgrade after this session."
              : `About ${Math.ceil(result.minutesToUpgrade)} more farming minutes to afford it.`}
          </p>
          <p className="text-sm leading-6 text-white/60">
            Official info confirms Brainrots earn cash offline and Roblox Plus adds +10% cash. Income rates, boost values, and upgrade multipliers are player-entered estimates until exact data is verified.
          </p>
          <p className="text-sm leading-6 text-white/60">
            Payback estimate: {Number.isFinite(result.paybackMinutes) ? `${Math.ceil(result.paybackMinutes)} minutes` : "needs an upgrade multiplier above 1.0"}.
          </p>
        </div>
      </div>
    </div>
  );
}
