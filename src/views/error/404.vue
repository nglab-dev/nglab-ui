<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="card flex flex-col items-center gap-8 sm:p-20">
      <div class="text-primary flex flex-col items-center justify-center gap-4 sm:flex-row">
        <span class="text-9xl font-bold"> 4 </span>
        <div class="bg-primary text-primary-contrast h-28 w-28 flex items-center justify-center rounded-full">
          <span class="text-9xl font-bold"> 0 </span>
        </div>
        <span class="text-9xl font-bold"> 4 </span>
      </div>
      <div class="border-surface border-t pt-8 text-center text-4xl font-bold">
        Page Not Found
      </div>
      <RouterLink to="/">
        <Button label="GO TO HOMEPAGE" />
      </RouterLink>
    </div>
  </div>
</template>
