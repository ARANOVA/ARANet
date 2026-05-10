// helpers/flex.ts
import { flexRender, CellContext, Renderable } from '@tanstack/react-table'
import Image from 'next/image'

interface FileRelation {
  file: {
    uri: string;
  }
}

export const generateImageUrlFromRelativePath = (partialUrl?: string, poster?: FileRelation[]): string => {
  if (poster && poster.length > 0) {
      return `/files/${poster[0].file.uri}`;
  }
  return !partialUrl ? `/files/${process.env.NEXT_PUBLIC_DEFAULT_POSTER}` : `/files/${partialUrl}`;
}

export function customFlexRender<T>(
  renderable: Renderable<CellContext<T, unknown>>,
  context: CellContext<T, unknown>
) {
  if (context.column.id === 'files') {
    const files = context.getValue() as any[];
    const poster = (files || []).filter(file => file.file.type === 'poster') || [];
    const alt = poster && poster.length > 0 ? poster[0].file?.metadata?.alt || '' : '';
    const thumbnail = generateImageUrlFromRelativePath('default.png', poster)

    return (
      <Image
          src={thumbnail}
          alt={alt}
          width={80}
          height={45}
          className="object-cover relative rounded overflow-hidden"
      />
    )
  }

  // comportamiento por defecto
  return flexRender(renderable, context)
}
