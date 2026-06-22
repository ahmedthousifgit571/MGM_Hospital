'use client';

import { useRouter, usePathname } from 'next/navigation';

export function DateFilterInput({ value }: { value: string }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <input
      type="date"
      defaultValue={value}
      onChange={(e) => router.push(`${pathname}?date=${e.target.value}`)}
      className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
    />
  );
}
