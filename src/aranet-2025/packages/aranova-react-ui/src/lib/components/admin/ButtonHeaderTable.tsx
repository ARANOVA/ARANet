'use client';

import { useEffect, useState } from 'react';
import { Alert, AlertActions, AlertBody, AlertDescription, AlertTitle, Button, Dropdown, DropdownButton, DropdownItem, DropdownLabel, DropdownMenu, DropdownShortcut } from '../tw';
import { ChevronDownIcon, ExclamationTriangleIcon, TrashIcon, ArrowDownTrayIcon, PencilIcon } from '@heroicons/react/16/solid';

interface Props {
  selectedItems: { id: unknown }[];
  selectedAll?: boolean;
  editFn?:() => void;
  exportFn?: (ids: number[] | number) => Promise<void> | void;
  deleteFn?: (ids: number[] | number) => Promise<boolean> | boolean;
  modalData?: { title: string; description?: string; body?: React.ReactNode }
}

export function ButtonHeaderTable({
  deleteFn,
  editFn,
  exportFn,
  selectedItems,
  selectedAll,
  modalData,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (ids: number[] | number) => {
    if (deleteFn) {
      if (selectedAll) {
        deleteFn([-1, -1]);
      } else {
        deleteFn(ids);
      }
    }
    setIsOpen(false);
  };

  const handleEdit = () => {
    if (editFn) editFn();
    setIsOpen(false);
  };

  const handleExport = (ids: number[] | number) => {
    if (exportFn) {
      if (selectedAll) {
        exportFn([-1, -1]);
      } else {
        exportFn(ids);
      }
    }
    setIsModalOpen(false);
  }

  const selectedIds: number[] = selectedItems.map((item) => {
    return item.id as number;
  });

  if (!editFn && !deleteFn && !exportFn) {
    return null;
  }

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // evitar renderizar en SSR

  const disabled = selectedItems.length === 0;
  return (
    <div className="grow sm:flex-none z-0 text-right">
      <Dropdown>
        <DropdownButton
          outline
          disabled={disabled}
          className='cursor-pointer'
        >
          Acciones de grupo
          <ChevronDownIcon />
        </DropdownButton>
        <DropdownMenu anchor="bottom end" className="min-w-48">
          {editFn && <DropdownItem onClick={() => handleEdit()} className='cursor-pointer' >
            <PencilIcon />
            <DropdownLabel>Editar</DropdownLabel>
            <DropdownShortcut keys="⌘S" />
          </DropdownItem> }
          {exportFn && modalData && <DropdownItem onClick={() => setIsModalOpen(true)} className='cursor-pointer' >
            <ArrowDownTrayIcon />
            <DropdownLabel>Exportar</DropdownLabel>
            <DropdownShortcut keys="⌘." />
          </DropdownItem> }
          {deleteFn && <DropdownItem onClick={() => setIsOpen(true)} className='cursor-pointer' >
            <TrashIcon />
            <DropdownLabel>Eliminar</DropdownLabel>
            <DropdownShortcut keys="⇧⌘⌫" />
          </DropdownItem> }
        </DropdownMenu>
      </Dropdown>
      <Alert open={isOpen} onClose={setIsOpen} size="lg">
        <AlertTitle className="justify-self-center">
          {selectedIds.length > 1 ? '¿Estás seguro que quieres eliminar los elementos seleccionados?' : '¿Estás seguro que quieres eliminar el elemento seleccionado?'}
        </AlertTitle>
        <AlertActions className="justify-self-center">
          <Button plain onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button
            color="red"
            onClick={() => {
              handleDelete(selectedIds);
            }}
          >
            <ExclamationTriangleIcon />
            Aceptar
          </Button>
        </AlertActions>
      </Alert>
      {/* Modal */}
      {exportFn && modalData && <Alert open={isModalOpen} onClose={setIsModalOpen} size="lg">
        <AlertTitle className="justify-self-center">
          {modalData.title}
        </AlertTitle>
        {modalData.description && <AlertDescription>
          {modalData.description}
        </AlertDescription>}
        {modalData.body && <AlertBody>
          {modalData.body}
        </AlertBody>}
        <AlertActions className="justify-self-center">
          <Button plain onClick={() => setIsModalOpen(false)}>
            Cancelar
          </Button>
          <Button
            color="dark/white"
            onClick={() => {
              handleExport(selectedIds);
            }}
          >
            Exportar
          </Button>
        </AlertActions>
      </Alert>}
    </div>
  )
}