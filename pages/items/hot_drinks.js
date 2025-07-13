"use client";

import { useState, useEffect } from "react";
import CustomTable from "@/components/Table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import { Label } from "@/components/ui/label"; 
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, MoreVertical, X, Trash2, Plus, Home } from "lucide-react"; 
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import Link from 'next/link'; 

import AddItemForm from "@/components/ui/addItemForm";


const headers = ["Nome", "Tipo", "Preço", "Ações"]; 


export default function HotDrinksPage() { 
  const { isLoading, data, mutate } = useSWR("/api/mock/hot_drinks", fetcher); 
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleUpdateSuccess = () => {
    mutate();
  };

  const handleDeleteSuccess = () => {
    mutate();
  };

  const handleAddSuccess = () => {
    setIsAddDialogOpen(false);
    mutate();
  };

  return (
    <div className="space-y-8 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-center text-2xl font-bold">Bebidas Quentes</h1> {}
        <div className="flex items-center gap-4"> {}
          {}
          <Link href="/" passHref>
            <Button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white hover:bg-gray-700 shadow-md">
              <Home className="h-4 w-4" /> {}
              Home
            </Button>
          </Link>

          {}
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Adicionar Bebida
              </Button>
            </DialogTrigger>
            <DialogContent className="text-white">
              <DialogHeader>
                <DialogTitle>Adicionar Nova Bebida Quente</DialogTitle> {}
                <DialogDescription>
                  Preencha os detalhes para adicionar uma nova bebida quente ao cardápio.
                </DialogDescription>
              </DialogHeader>
              <AddItemForm
                onAddSuccess={handleAddSuccess}
                onCancel={() => setIsAddDialogOpen(false)}
                apiEndpoint="/api/mock/hot_drinks"
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-600">Carregando bebidas quentes...</p>
      ) : (
        data && data.length > 0 ? (
          <CustomTable
            Options={({ rowData }) => (
              <ItemOptionsHotDrinks 
                itemId={rowData.id}
                onUpdateSuccess={handleUpdateSuccess}
                onDeleteSuccess={handleDeleteSuccess}
              />
            )}
            headers={headers}
            rows={
              data.map((val) => {
                return {
                  id: val.id,
                  "Nome": val.title,
                  "Tipo": val.content,
                  Preço: `R$${Number(val.amount).toFixed(2).replace(".", ",")}`,
                };
              })
            }
          />
        ) : (
          <p className="text-center text-gray-600">Nenhuma bebida quente encontrada.</p>
        )
      )}
    </div>
  );
}


function ItemOptionsHotDrinks({ itemId, onUpdateSuccess, onDeleteSuccess }) { 
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [productData, setProductData] = useState({
    title: '',
    content: '',
    amount: '',
    image: '',
    category: 4, 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (isEditDialogOpen && itemId) {
      const fetchProduct = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`/api/mock/hot_drinks?id=${itemId}`); 
          if (!response.ok) {
            throw new Error(`Erro ao buscar dados da bebida: ${response.statusText}`);
          }
          const data = await response.json();
          setProductData({
            title: data.title || '',
            content: data.content || '',
            amount: data.amount || '',
            image: data.image ? data.image.split('/').pop() : '',
            category: data.category_id || 4,
          });
        } catch (err) {
          console.error("Erro ao carregar dados para edição:", err);
          setError("Falha ao carregar dados para edição.");
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [isEditDialogOpen, itemId]);


  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };


  const handleUpdate = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/mock/hot_drinks?id=${itemId}`, { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro ao atualizar bebida: ${response.statusText}`);
      }

      const updatedItem = await response.json();
      console.log('Bebida atualizada com sucesso:', updatedItem);
      onUpdateSuccess && onUpdateSuccess(updatedItem);
      setIsEditDialogOpen(false);
    } catch (err) {
      console.error('Erro ao atualizar bebida:', err);
      setError(err.message || 'Falha ao atualizar a bebida.');
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir esta bebida?")) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/mock/hot_drinks?id=${itemId}`, { 
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro ao excluir bebida: ${response.statusText}`);
      }

      const deletedInfo = await response.json();
      console.log('Bebida excluída com sucesso:', deletedInfo);
      onDeleteSuccess && onDeleteSuccess(itemId);
      setIsEditDialogOpen(false);
    } catch (err) {
      console.error('Erro ao excluir bebida:', err);
      setError(err.message || 'Falha ao excluir a bebida.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogTrigger asChild>
        <MoreVertical className="!h-6 !w-6 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="text-white">
        <DialogHeader>
          <DialogTitle>Atualizar Bebida Quente</DialogTitle> {}
          <DialogDescription>
            Faça as alterações necessárias, e clique em salvar.
          </DialogDescription>
        </DialogHeader>

        {loading && <p>Carregando dados...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right text-gray-800">Nome</Label>
              <Input
                id="title"
                value={productData.title}
                onChange={handleInputChange}
                className="col-span-3 text-gray-800 bg-white border border-gray-300"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content" className="text-right text-gray-800">Tipo</Label>
              <Input
                id="content"
                value={productData.content}
                onChange={handleInputChange}
                className="col-span-3 text-gray-800 bg-white border border-gray-300"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right text-gray-800">Preço</Label>
              <Input
                id="amount"
                type="number"
                value={productData.amount}
                onChange={handleInputChange}
                className="col-span-3 text-gray-800 bg-white border border-gray-300"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right text-gray-800">Imagem (URL)</Label>
              <Input
                id="image"
                value={productData.image}
                onChange={handleInputChange}
                className="col-span-3 text-gray-800 bg-white border border-gray-300"
              />
            </div>
          </div>
        )}

        <DialogFooter className="!justify-center">
          <Button variant="destructive" onClick={handleDelete} disabled={loading}>
            <Trash2 className="!h-4 !w-4 mr-2" />
            Excluir
          </Button>
          <DialogClose asChild>
            <Button variant="outline" disabled={loading}>
              <X className="!h-4 !w-4 mr-2" />
              Cancelar
            </Button>
          </DialogClose>
          <Button variant="secondary" onClick={handleUpdate} disabled={loading}>
            <Check className="!h-4 !w-4 mr-2" />
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}