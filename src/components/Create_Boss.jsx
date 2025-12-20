import React, { useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { TrashIcon } from "@heroicons/react/24/outline";

const Create_Boss = () => {
  const [phrases, setPhrases] = useState([
    { text: "", triggerPercentage: "" }
  ]);

  const handleAddPhrase = () => {
    setPhrases([...phrases, { text: "", triggerPercentage: "" }]);
  };

  const handleRemovePhrase = (index) => {
    const newPhrases = phrases.filter((_, i) => i !== index);
    setPhrases(newPhrases);
  };

  const handlePhraseChange = (index, field, value) => {
    const newPhrases = [...phrases];
    newPhrases[index][field] = value;
    setPhrases(newPhrases);
  };

  return (
    <div className="bg-[#242424] min-h-screen px-4 py-8 flex flex-col justify-center">
      <form className="mt-10 max-w-lg mx-auto">
        <div className="space-y-12"> 
          <div className="border-b border-white/10 pb-12">
            <h2 className="text-base/7 font-semibold text-white">Cadastre um boss</h2>
            <p className="mt-1 text-sm/6 text-gray-400">
                Forneça as informações básicas do boss.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
              <div className="sm:col-span-4">
                <label
                  htmlFor="nomeBoss"
                  className="block text-sm/6 font-medium text-white"
                >
                  Nome do Boss
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                    <input
                      id="nomeBoss"
                      name="nomeBoss"
                      type="text"
                      placeholder="janesmith"
                      className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm/6 font-medium text-white"
                >
                  Imagem do boss
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      aria-hidden="true"
                      className="mx-auto size-12 text-gray-600"
                    />
                    <div className="mt-4 flex text-sm/6 text-gray-400 justify-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-500 hover:text-indigo-300"
                      >
                        <span>Faça o upload</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                    </div>
                    <p className="text-xs/5 text-gray-400">
                      PNG, JPG, GIF até 10MB
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm/6 font-medium text-white"
                >
                  Background do boss
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      aria-hidden="true"
                      className="mx-auto size-12 text-gray-600"
                    />
                   <div className="mt-4 flex text-sm/6 text-gray-400 justify-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-500 hover:text-indigo-300"
                      >
                        <span>Faça o upload</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                    </div>
                    <p className="text-xs/5 text-gray-400">
                      PNG, JPG, GIF até 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-white/10 pb-12">
            <h2 className="text-base/7 font-semibold text-white">
              Detalhes do Boss
            </h2>
            <p className="mt-1 text-sm/6 text-gray-400">
              Informe os detalhes específicos do boss.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm/6 font-medium text-white"
                >
                  Vida
                </label>
                <div className="mt-2">
                  <input
                    id="first-name"
                    name="first-name"
                    placeholder="0"
                    type="number"
                    autoComplete="given-name"
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm/6 font-medium text-white"
                >
                  Vida máxima
                </label>
                <div className="mt-2">
                  <input
                    id="last-name"
                    name="last-name"
                    placeholder="0"
                    type="number"
                    autoComplete="family-name"
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label className="block text-sm/6 font-medium text-white mb-4">
                  Frases do boss
                </label>
                <div className="space-y-4">
                  {phrases.map((phrase, index) => (
                    <div key={index} className="flex gap-4 items-end">
                      <div className="flex-1">
                        <label className="block text-xs text-gray-400 mb-2">
                          Frase {index + 1}
                        </label>
                        <input
                          type="text"
                          value={phrase.text}
                          onChange={(e) =>
                            handlePhraseChange(index, "text", e.target.value)
                          }
                          placeholder="Digite a frase do boss"
                          className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        />
                      </div>
                      <div className="w-32">
                        <label className="block text-xs text-gray-400 mb-2">
                          Gatilho (%)
                        </label>
                        <input
                          type="number"
                          value={phrase.triggerPercentage}
                          onChange={(e) =>
                            handlePhraseChange(
                              index,
                              "triggerPercentage",
                              e.target.value
                            )
                          }
                          placeholder="0-100"
                          min="0"
                          max="100"
                          className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        />
                      </div>
                      {phrases.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemovePhrase(index)}
                          className="p-2 text-red-400 hover:bg-red-500/10 rounded-md transition cursor-pointer"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleAddPhrase}
                  className="mt-4 px-4 py-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 border border-indigo-500/30 hover:border-indigo-500/50 rounded-md transition cursor-pointer"
                >
                  + Adicionar frase
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 cursor-pointer flex justify-center w-full hover:bg-indigo-400 transition"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create_Boss;
