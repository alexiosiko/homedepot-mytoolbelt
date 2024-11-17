import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-full max-w-2xl p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-4xl text-center mb-4">Project Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">
            I developed a Home Depot software clone, focusing on sequencing functionalities and integrating a MongoDB database. The project was built using Next.js and Shadcn UI, incorporating an article lookup feature that fetches data via the Home Depot API.
          </p>
          <Separator className="my-4" />
          <h2 className="text-2xl mb-2">Technologies and Skills Utilized</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <Badge className="mr-2">Next.js</Badge>
              Employed for server-side rendering and building a robust React application.
            </li>
            <li>
              <Badge className="mr-2">Shadcn UI</Badge>
              Utilized for accessible and customizable UI components.
            </li>
            <li>
              <Badge className="mr-2">MongoDB</Badge>
              Implemented as the database to manage and store application data.
            </li>
            <li>
              <Badge className="mr-2">Home Depot API</Badge>
              Integrated to fetch real-time product information for the article lookup feature.
            </li>
            <li>
              <Badge className="mr-2">Sequencing Functionality</Badge>
              Developed to replicate specific operational sequences of the original software.
            </li>
            <li>
              <Badge className="mr-2">Article Lookup Feature</Badge>
              Enabled users to search and retrieve detailed product information.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}