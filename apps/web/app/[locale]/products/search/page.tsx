import { Container } from "@repo/ui/container";
import { Suspense } from "react";
import { SearchSection } from "@/features/products/components/SearchSection";
import { RouteHead, routeMetadata } from "@/shell/RouteHead";

export const generateMetadata = () => routeMetadata("/products/search");

export default function SearchPage() {
  return (
    <Container as="section">
      <RouteHead route="/products/search" />
      <Suspense>
        <SearchSection />
      </Suspense>
    </Container>
  );
}
