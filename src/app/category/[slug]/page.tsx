import ProductByCategory from "@/app/components/ProductsByCategory"
type Props = {
    params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: Props) {
    const { slug } = await params

    return (
        <div className="flex min-h-screen flex-col">
            <main className="mx-auto w-full max-w-[1500px] flex-1 px-4 py-5 sm:px-6">
                <ProductByCategory slug={slug} />
            </main>
        </div>
    )
}