'use client';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

export default function DarkModeDemo() {
  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Démonstration du Dark Mode
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Testez les différents composants en mode sombre
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Carte avec contenu */}
        <Card className="bg-white dark:bg-[#1E2A36] border-gray-200 dark:border-gray-700 shadow-lg dark:shadow-xl">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">
              Carte d'exemple
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Description de la carte en mode sombre
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                className="bg-white dark:bg-[#1F2937] border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <div>
              <Label htmlFor="role" className="text-gray-700 dark:text-gray-300">
                Rôle
              </Label>
              <Select>
                <SelectTrigger className="bg-white dark:bg-[#1F2937] border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
                  <SelectValue placeholder="Sélectionner un rôle" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#1E2A36] border-gray-200 dark:border-gray-700">
                  <SelectItem value="admin" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    Administrateur
                  </SelectItem>
                  <SelectItem value="user" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    Utilisateur
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white">
              Sauvegarder
            </Button>
          </CardContent>
        </Card>

        {/* Tableau d'exemple */}
        <Card className="bg-white dark:bg-[#1E2A36] border-gray-200 dark:border-gray-700 shadow-lg dark:shadow-xl">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">
              Tableau d'exemple
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Données en mode sombre
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Utilisateur 1', role: 'Admin', status: 'Actif' },
                { name: 'Utilisateur 2', role: 'User', status: 'Inactif' },
                { name: 'Utilisateur 3', role: 'Moderator', status: 'Actif' },
              ].map((user, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#1F2937] rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{user.role}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    user.status === 'Actif' 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' 
                      : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                  }`}>
                    {user.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Boutons d'action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-wrap gap-4 justify-center"
      >
        <Button variant="outline" className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
          Bouton Outline
        </Button>
        <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white">
          Bouton Principal
        </Button>
        <Button variant="ghost" className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
          Bouton Ghost
        </Button>
      </motion.div>
    </div>
  );
} 