import {ApolloServer, gql} from 'apollo-server'

const typeDefs = gql `
  type Dessert {
      dessert: String
      nutritionInfo: NutritionInfo
  }
  type NutritionInfo {
      calories: Int
      fat: Int,
      carb: Int,   
      protein: Int
  }
  type Query {
      desserts: [Dessert]
  }

  type Mutation {
      addDessert(dessert: DessertInput): [Dessert]
      deleteDesserts(dessert: [String]): [Dessert]
      resetData: [Dessert]
  }


  input DessertInput {
      dessert: String
      nutritionInfo: NutritionInfoInput
  }

  input NutritionInfoInput {
    calories: Int
    fat: Int,
    carb: Int,   
    protein: Int
  }
`

const desserts =  [ {
    dessert: "Oreo",
    nutritionInfo: {
        calories: 437,
        fat: 18,
        carb: 63,   
        protein: 4,
    }
},
{   
    dessert: "Nougat",
    nutritionInfo: {
        calories: 360,
        fat: 19,
        carb: 9,   
        protein: 37,
    }
},
]

const newDesserts = [...desserts]

const resolvers = {
    Query: {
        desserts: () => newDesserts,
    },
    Mutation: {
        addDessert: (_parent: any, args: any) => {
            newDesserts.push(args.dessert)
            return newDesserts
        },
        deleteDesserts: (_parent: any, args: any) => {
            args.dessert.map((word: string) => {
                const index = newDesserts.findIndex((i => i.dessert === word))
                
                if(index > -1) {newDesserts.splice(index, 1)}
            })
            return newDesserts
        },
        resetData: () => {   
            newDesserts.splice(0, newDesserts.length, ...desserts)        
            return newDesserts
        }
    }
}

const server = new ApolloServer({typeDefs, resolvers})


server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  })