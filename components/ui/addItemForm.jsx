"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Check, X } from "lucide-react";

export default function AddItemForm({ onAddSuccess, onCancel, apiEndpoint = '/api/items' }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    amount: '',
    image: '',
    category_id: 3, 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.title || !formData.amount) {
      setError("Título e Preço são campos obrigatórios.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(apiEndpoint, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro ao adicionar item: ${response.statusText}`);
      }

      const newItem = await response.json();
      console.log('Item adicionado com sucesso:', newItem);
      alert('Item adicionado com sucesso!');
      onAddSuccess && onAddSuccess(newItem);
      setFormData({
        title: '',
        content: '',
        amount: '',
        image: '',
        category_id: 3,
      });
    } catch (err) {
      console.error('Erro ao adicionar item:', err);
      setError(err.message || 'Falha ao adicionar o item.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="grid grid-cols-4 items-center gap-4">
        {}
        <Label htmlFor="title" className="text-right text-gray-800">Nome</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={handleInputChange}

          className="col-span-3 text-gray-800 bg-white border border-gray-300"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        {}
        <Label htmlFor="content" className="text-right text-gray-800">Descrição</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={handleInputChange}

          className="col-span-3 text-gray-800 bg-white border border-gray-300"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        {}
        <Label htmlFor="amount" className="text-right text-gray-800">Preço</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          value={formData.amount}
          onChange={handleInputChange}

          className="col-span-3 text-gray-800 bg-white border border-gray-300"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        {}
        <Label htmlFor="image" className="text-right text-gray-800">Imagem (URL)</Label>
        <Input
          id="image"
          value={formData.image}
          onChange={handleInputChange}

          className="col-span-3 text-gray-800 bg-white border border-gray-300"
        />
      </div>
      {}

      <DialogFooter className="!justify-end gap-3 pt-4">
        <DialogClose asChild>
          <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
        </DialogClose>
        <Button type="submit" disabled={loading}>
          <Check className="h-4 w-4 mr-2" />
          {loading ? 'Adicionando...' : 'Adicionar'}
        </Button>
      </DialogFooter>
    </form>
  );
}