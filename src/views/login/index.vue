<script setup>

</script>

<template>
  <div class="relative mx-auto hidden h-full w-full flex-col items-center justify-center container md:grid lg:grid-cols-2 lg:max-w-none lg:px-0">
    <div class="absolute right-4 top-4 md:right-8 md:top-8">
      <AppLocalePicker />
    </div>

    <div class="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:(border-r border-[#27272a])">
      <div class="absolute inset-0 bg-zinc-900" />
      <div class="relative z-20 flex items-center text-lg font-medium">
        <AppLogo />
        Nglab
      </div>

      <div class="relative z-20 mt-auto">
        <blockquote class="space-y-2">
          <p class="text-lg">
            “Nglab is the next generation laboratory information system.”
          </p>
          <footer class="text-sm">
            xc.chen
          </footer>
        </blockquote>
      </div>
    </div>
    <div class="lg:p-8">
      <div class="mx-auto w-full flex flex-col justify-center sm:w-[420px] space-y-6">
        <div class="flex flex-col text-center space-y-2">
          <h1 class="text-3xl font-semibold tracking-tight">
            Login an account
          </h1>
          <p class="text-muted-foreground text-sm">
            Enter your email below to login your account
          </p>
        </div>

        <div class="grid gap-6">
          xxx
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

</style>
